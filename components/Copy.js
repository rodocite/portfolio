import styled from 'styled-components'

const Text = styled.div`
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 1.5px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 100;
  @media (min-width: 768px) {
    font-size: 35px;
    line-height: 50px;
  }
`

export default ({ children }) => {
  return (
    <Text>{ children }</Text>
  )
}