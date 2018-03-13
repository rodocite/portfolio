import styled from 'styled-components'
import Link from 'next/link'
import { withRouter } from 'next/router'

const LinkTag = styled.a`
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  text-decoration: none;
  padding: 5px;
  background: #111111;
  border-radius: 7px;
  pointer-events: all;
`

class RepoLink extends React.Component {
  render() {
    const { pathname } = this.props.router
    const project = pathname.match('projects')

    let githubPath = project
      ? `https://github.com/rodocite/portfolio/tree/master/${pathname.split('/projects/')[1]}`
      : null

    return githubPath && (
      <LinkTag href={ githubPath }>Peep the code</LinkTag>
    )
  }
}

export default withRouter(RepoLink)
