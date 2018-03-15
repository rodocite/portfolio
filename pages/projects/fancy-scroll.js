import Layout from '../../components/Layout.js'
import Copy from '../../components/Copy'
import styled from 'styled-components'
import _ from 'lodash'

const Background = styled.div`
  padding: ${props => props.color > 0 ? '20px' : '0px'};
  margin: ${props => props.color > 0 ? '20px' : '0px'};
  background: ${props => ['black', 'red', 'orange', 'green', 'blue'][props.color]};
  transition: all 300ms ease-in-out;
  -webkit-overflow-scrolling: auto;
`

const Box = styled.div`
  position: relative;
  display: flex;
  padding: 10px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  justify-content: center;
  align-items: center;
  border: 5px solid white;
  height: 300px;
  color: white;
  overflow: hidden:
`

const Text = styled.div`
  position: absolute;
  font-size: 20px;
  transform: translateY(-50%);
  top: 50%;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`

const ScrollElement = (props) => {
  const { text, frame } = props

  return (
      <Background color={ frame } id="fancy-scroll-el">
        <Box>
          <Text className="fancy-scroll-text">{ text }</Text>
        </Box>
      </Background>
  )
}

class FancyScroll extends React.Component {
  state = {
    frame: 0
  }

  componentDidMount() {
    this.scrollingEl = document.querySelector('#fancy-scroll-el')
    TweenMax.fromTo('.fancy-scroll-text', 0.4, { opacity: 0 }, { opacity: 1 })
    this.scrollingEl.addEventListener('touchstart', this.touchStartEvent)
    this.scrollingEl.addEventListener('wheel', this.scrollEvent, { passive: true })
  }

  componentWillUpdate(__, prevState) {
    const { frame } = this.state
    const { frame: prevFrame } = prevState
    const isNext = frame < prevFrame

    if (isNext) {
      TweenMax.fromTo('.fancy-scroll-text', 0.5, { opacity: -2, top: '80%' }, { opacity: 1, top: '50%' })
    } else {
      TweenMax.fromTo('.fancy-scroll-text', 0.5, { opacity: -2, top: '20%' }, { opacity: 1, top: '50%' })
    }
  }

  componentWillUnmount() {
    this.scrollingEl.removeEventListener('wheel', this.scrollEvent, { passive: true })
    this.scrollingEl.removeEventListener('touchstart', this.touchStartEvent)
    this.scrollingEl.removeEventListener('touchmove', this.touchMoveEvent)
  }

  touchStartEvent = (touchStartEvent) => {
    touchStartEvent.preventDefault()
    const { screenY: start } = touchStartEvent.touches[0]
    this.scrollingEl.addEventListener('touchmove', this.touchMoveEvent(start))
  }

  touchMoveEvent = (start) => (touchMoveEvent) => {
    const { frame } = this.state
    const { screenY: end } = touchMoveEvent.changedTouches[0]
    const distance = start - end

    if (distance > 30 && frame < 4) {
      this.setState({ frame: frame + 1 })
    }

    if (distance < -30 && frame > 0) {
      this.setState({ frame: frame - 1 })
    }
  }

  scrollEvent = _.debounce((e) => {
    const { deltaY } = e
    const { frame } = this.state

    if (deltaY > 1 && frame < 4) {
      this.setState({ frame: frame + 1 })
    }

    if (deltaY < 1 && frame > 0) {
      this.setState({ frame: frame - 1 })
    }
  }, 250, { maxWait: 300, leading: true, trailing: false })

  render() {
    const textList = [
      'Scroll Me',
      'Again',
      'And Again',
      'One More time',
      'Fancy'
    ]

    return (
      <Layout>
        <ScrollElement
          text={ textList[this.state.frame] }
          frame={ this.state.frame }
        />
      </Layout>
    )
  }
}

export default FancyScroll
