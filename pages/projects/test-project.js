import Layout from '../../components/Layout.js'
import Copy from '../../components/Copy'
import Link from 'next/link'
import styled from 'styled-components'

const List = styled.ul`
`

const ListItem = styled.li`
  line-height: 30px;
  letter-spacing: 1.5px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 100;

  @media (min-width: 768px) {
    font-size: 24px;
    line-height: 50px;
  }

  & > a {
    color: #111111;
    text-decoration: none;
    border-bottom: 2px solid white;
    transition: all 200ms ease-in-out;

    :hover {
      border-bottom: 2px solid black;
    }
  }
`

export default ({ children }) => (
  <Layout>
    <Copy>
      <p>I'm a Software Engineer who specializes in modern Javascript such as ES6, React, Redux, and Next! You can rely on me to deliver on your JS needs.</p>
      <p>This site is intended to showcase my toy projects. The code for this site and projects on it (including on-going work) are all on Github for you to see.</p>
    </Copy>
    <List>
      <ListItem>
        <Link href="https://github.com/rodocite/portfolio"><a>Portfolio Repo</a></Link>
      </ListItem>
      <ListItem>
        <Link href="https://github.com/rodocite"><a>Github</a></Link>
      </ListItem>
      <ListItem>
        <Link href="https://linkedin.com/in/rodolfoyabut"><a>LinkedIn</a></Link>
      </ListItem>
      <ListItem>
        <Link href="mailto:rodolfoyabut@gmail.com"><a>Email Me</a></Link>
      </ListItem>
    </List>
  </Layout>
)
