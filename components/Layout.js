import Nav from './Nav'
import Hamburger from './Hamburger'
import RepoLink from './RepoLink'
import styled from 'styled-components'
import { TweenMax } from 'gsap'

const Grid = styled.div`
  opacity: 0;
  padding: 40px;
  display: grid;
  grid-gap: 20px;
  grid-template-areas:
    "header"
    "nav"
    "content"
    "footer";
  @media (min-width: 768px) {
    max-width: 700px;
  }

  @media (min-width: 1024px) {
    max-width: 900 px;
  }
`

const Header = styled.div`
  grid-area: header;
  display: flex;
  align-items: center;
`
const Content = styled.div`
  grid-area: content;
`

const Footer = styled.div`
  grid-area: footer;
`

class Layout extends React.Component {
  state = {
    isDesktop: false
  }

  componentDidMount() {
    TweenMax.to(['.layout-transition'], 0.5, { opacity: 1 })
  }

  render() {
    return (
      <Grid className="layout-transition">
        <Header>
          <Hamburger>
            <Nav />
          </Hamburger>
        </Header>
        <Content>
          <RepoLink />
          { this.props.children }
        </Content>
        <Footer />
      </Grid>
    )
  }
}

export default Layout