import styled from 'styled-components'
import { TweenMax } from 'gsap'

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Button = styled.div`
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 25px;
`

const Logo = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 24px;
  font-weight: 100;
`

const lineBase = styled.div`
  width: 50px;
  margin: 3px 0 3px 0;
  height: 10px;
  background: ${ props => !props.closed ? 'black' : 'gray'};
  transition: all 200ms ease-in-out;
`

const Line1 = lineBase.extend`
  top: ${ props => !props.closed ? '10%' : '50%' };
`

const Line2 = lineBase.extend`
  top: 50%;
  opacity: ${ props => !props.closed ? 1 : 0 };
`

const Line3 = lineBase.extend`
  top: ${ props => !props.closed ? '90%' : '50%' };
  transform: rotate(${ props => !props.closed ? '0deg' : '-225deg'});
`

const OverlayContainer = styled.div`
  position: relative;
`

const Overlay  = styled.div`
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: ${ props => props.closed ? 'none' : 'all' };
  opacity: ${ props => props.closed ? 0 : 1 };
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  transition: opacity 500ms ease-in-out;
  z-index: 10;
`

const Menu  = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100%;
  width: 60vw;
  box-shadow: 2px 2px 20px 1px rgba(0, 0, 0, 0.2);
  top: 0;
  left: -100vw;
  transform: rotateY(0deg);
  background: white;
  z-index: 15;
  -webkit-tap-highlight-color: rgba(0,0,0,0);

  @media (min-width: 768px) {
    width: 250px;
  }
`

const Close = styled.div`
  align-self: flex-end;
  font-size: 60px;
  line-height: 0.5;
  cursor: pointer;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    font-size: 42px;
  }
`

class Hamburger extends React.Component {
  state = {
    close: true,
    isDesktop: false
  }

  componentDidMount() {
    const mq = window.matchMedia('(min-width: 768px)')

    mq.addListener(() => {
      this.setState({ isDesktop: mq.matches })
    })

    this.setState({ isDesktop: mq.matches })
  }

  componentDidUpdate() {
    if(!this.state.close) {
      TweenMax.to(['.hamburger-menu'], 0.3, { left: '0vw' })
    } else {
      TweenMax.to(['.hamburger-menu'], 0.3, { left: '-100vw' })
    }
  }

  show() {
    this.setState({ close: !this.state.close })
  }

  renderLogo() {
    return this.state.isDesktop
      ? <Logo>Rodolfo Yabut</Logo>
      : <Logo>Rodo</Logo>
  }

  renderButton() {
    return (
      <Button onClick={(e) => this.show(e)}>
        <Line1 />
        <Line2 />
        <Line3 />
      </Button>
    )
  }

  renderMenu() {
    return (
      <OverlayContainer>
        <Overlay onClick={() => this.show()} closed={this.state.close} />
        <Menu className="hamburger-menu">
          <Close onClick={() => this.show()}>&#215;</Close>
          { this.props.children }
        </Menu>
      </OverlayContainer>
    )
  }

  render() {
    return (
      <Container>
        {this.renderButton()}
        {this.renderLogo()}
        {this.renderMenu()}
      </Container>
    )
  }
}

export default Hamburger