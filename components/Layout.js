import Nav from './Nav'
import Hamburger from './Hamburger'
import RepoLink from './RepoLink'
import styled from 'styled-components'
import { TweenMax } from 'gsap'

const Grid = styled.div`
  display: grid;
  grid-gap: 10px;
  opacity: 0;
  padding: 20px;
  grid-template-areas:
    "header"
    "nav"
    "content"
    "footer";

  @media (min-width: 768px) {
    max-width: 700px;
  }

  @media (min-width: 1024px) {
    padding: 40px;
    max-width: 900 px;
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: header;
`

const Content = styled.div`
  grid-area: content;
`

const RepoLinkContainer = styled.div`
  margin-top: 30px;
`

const Peep = () => (
  <RepoLinkContainer>
    <RepoLink />
  </RepoLinkContainer>
)


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
          <div>
            <Hamburger>
              <Nav />
            </Hamburger>
          </div>
          <Peep />
        </Header>
        <Content>
          { this.props.children }
        </Content>
      </Grid>
    )
  }
}

export default Layout