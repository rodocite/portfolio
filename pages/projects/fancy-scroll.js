import Layout from '../../components/Layout.js'
import Copy from '../../components/Copy'
import styled from 'styled-components'

const Background = styled.div`
  width: 100%;
  height: 300px;
  background: black;
`

export default ({ children }) => (
  <Layout>
    <Background />
  </Layout>
)
