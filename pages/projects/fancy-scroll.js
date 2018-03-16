import Layout from '../../components/Layout.js'
import Copy from '../../components/Copy'
import styled from 'styled-components'
import _ from 'lodash'

const Background = styled.div`
  -webkit-overflow-scrolling: auto;
  background: ${props => ['black', 'red', 'orange', 'green', 'blue'][props.color]};
  margin: ${props => props.color > 0 ? '20px' : '0px'};
  padding: ${props => props.color > 0 ? '20px' : '0px'};
  transition: all 300ms ease-in-out;
`

const Box = styled.div`
  align-items: center;
  border: 5px solid white;
  color: white;
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  height: 300px;
  justify-content: center;
  overflow: hidden:
  padding: 10px;
  position: relative;
`

const Text = styled.div`
  font-size: 20px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  @media (min-width: 768px) {
    font-size: 32px;
  }
`

const ScrollElement = (props) => {
  const {
    text,
    frame,
    wheelHandler,
    touchStartHandler,
    touchMoveHandler
  } = props

  return (
    <Background
      color={ frame }
      id="fancy-scroll-el"
      onWheel={ wheelHandler }
      onTouchStart={ touchStartHandler }
      onTouchMove={(e) => {
        e.persist()
        touchMoveHandler(e)
      }}
    >
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

  startTouchRecord = []

  componentDidMount() {
    TweenMax.fromTo('.fancy-scroll-text', 0.4, { opacity: 0 }, { opacity: 1 })
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

  touchStartEvent = (e) => {
    e.preventDefault()
    const { screenY: start } = e.touches[0]
    this.startTouchRecord.push(start)
  }

  touchMoveEvent = _.debounce((e) => {
    const { frame } = this.state
    const { screenY: end } = e.changedTouches[0]
    const start = _.last(this.startTouchRecord)
    const distance = Math.abs(start - end)
    const swipedUp = start > end

    if (swipedUp && distance > 30 && frame < 4) {
      this.setState({ frame: this.state.frame + 1 })
    }

    if (!swipedUp && distance > 30 && frame > 0) {
      this.setState({ frame: this.state.frame - 1 })
    }

    this.flushStartTouchRecord()
  }, 150)

  wheelEvent = _.debounce((e) => {
    const { deltaY } = e
    const { frame } = this.state

    if (deltaY > 1 && frame < 4) {
      this.setState({ frame: frame + 1 })
    }

    if (deltaY < 1 && frame > 0) {
      this.setState({ frame: frame - 1 })
    }
  }, 30, { leading: true, trailing: false })

  flushStartTouchRecord() {
    this.startTouchRecord = []
  }

  render() {
    const textList = [
      'Scroll Me',
      'Again',
      'And Again',
      'One More Time',
      'Fancy'
    ]

    return (
      <Layout>
        <ScrollElement
          frame={ this.state.frame }
          text={ textList[this.state.frame] }
          touchMoveHandler={ this.touchMoveEvent }
          touchStartHandler={ this.touchStartEvent }
          wheelHandler={ this.wheelEvent }
        />
      </Layout>
    )
  }
}

export default FancyScroll
