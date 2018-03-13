import Link from 'next/link'
import styled from 'styled-components'

const Column = styled.div`
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 23px;
  color: #111111;

  @media (min-width: 768px) {
    font-size: 15px;
  }
`

const LinkTag = styled.a`
  font-weight: 100;
  color: #111111;
  cursor: pointer;
  text-decoration: none;
  transition: color 300ms ease-in-out, margin 600ms ease-in-out;

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
  position: absolute;
  margin-left: 0px;
  opacity: 0;
  transition: all 300ms ease-in-out;

  &:before {
    content: '\u2192';
  }
`

const StyledLink = (props) => {
  return (
    <LinkTag onClick={props.onClick}>
      {props.text}
      <Arrow />
    </LinkTag>
  )
}

const renderNavList = (list) => (
  list.map((member, index) => (
    <Link href={member.href} key={index}>
      <StyledLink text={member.text} />
    </Link>
  ))
)

const about = [
  { href: '/', text: 'Home' },
  { href: '/projects/test-project', text: 'Test Project' }
]

const Nav = (props) => {
  return (
    <Column>
      {renderNavList(about)}
    </Column>
  )
}

export default Nav
