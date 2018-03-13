import Link from 'next/link'
import { withRouter } from 'next/router'
import styled from 'styled-components'

const Column = styled.div`
  color: #111111;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 23px;

  @media (min-width: 768px) {
    font-size: 15px;
  }
`

const LinkTag = styled.a`
  background: ${({ selected }) => selected ? '#111111' : 'none' };
  color: ${({ selected }) => selected ? 'white' : '#111111' };
  cursor: pointer;
  font-weight: ${({ selected }) => selected ? 600 : 100 };
  padding: 10px;
  pointer-events: ${({ selected }) => selected ? 'none' : 'all' };
  text-decoration: none;
  transition: color 300ms ease-in-out, margin 600ms ease-in-out;

  @media (min-width: 768px) {
    padding: 5px;
  }

  :hover {
    @media (min-width: 768px) {
      & span {
        margin-left: 5px;
        opacity: 1;
      }
    }
  }
`

const Arrow = styled.span`
  margin-left: 0px;
  opacity: 0;
  position: absolute;
  transition: all 300ms ease-in-out;

  &:before {
    content: '\u2192';
  }
`

const StyledLink = (props) => {
  const { onClick, text, selected } = props
  return (
    <LinkTag
      onClick={ onClick }
      selected={ selected }
    >
      { text }
      <Arrow />
    </LinkTag>
  )
}

const renderNavList = (list, pathname) => (
  list.map((member, index) => {
    const { href, text } = member
    const selected = pathname === href

    return (
      <Link
        href={ href }
        key={ index }>
          <StyledLink
            text={ text }
            selected={ selected }
          />
      </Link>
    )
  })
)

const about = [
  { href: '/', text: 'Home' },
  { href: '/projects/test-project', text: 'Test Project' }
]

const Nav = (props) => {
  const pathname = props.router.pathname

  return (
    <Column>
      {renderNavList(about, pathname)}
    </Column>
  )
}

export default withRouter(Nav)
