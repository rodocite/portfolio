import Nav from './Nav'
import Hamburger from './Hamburger'
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
  justify-content: space-between;
  align-items: center;
`

const GridNav = styled.div`
  grid-area: nav;
`

const Content = styled.div`
  grid-area: content;
`

const Footer = styled.div`
  grid-area: footer;
`

const Logo = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  color: #111111
`

class Layout extends React.Component {
  state = {
    isDesktop: false
  }

  componentDidMount() {
    const mq = window.matchMedia('(min-width: 768px)')

    mq.addListener(() => {
      this.setState({ isDesktop: mq.matches })
    })

    this.setState({ isDesktop: mq.matches })

    TweenMax.to(['.layout-transition'], 0.5, { opacity: 1 })
  }

  renderLogo() {
    return this.state.isDesktop
      ? <Logo>Rodolfo Yabut</Logo>
      : <Logo>Rodo</Logo>
  }

  render() {
    return (
      <Grid className="layout-transition">
        <Header>
          <Hamburger>
            <Nav />
          </Hamburger>
          { this.renderLogo() }
        </Header>
        <Content>
          { this.props.children }
        </Content>
        <Footer />
      </Grid>
    )
  }
}

export default Layout