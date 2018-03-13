import styled from 'styled-components'
import Link from 'next/link'
import { withRouter } from 'next/router'

const LinkTag = styled.a`
  background: #111111;
  border-radius: 7px;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  width: 100px;
`

class RepoLink extends React.Component {
  render() {
    const { pathname } = this.props.router
    const project = pathname.match('projects')

    let githubPath = project
      ? `https://github.com/rodocite/portfolio/tree/master/pages${pathname}.js`
      : null

    return githubPath && (
      <LinkTag href={ githubPath } target="_blank">Peep Code</LinkTag>
    )
  }
}

export default withRouter(RepoLink)
