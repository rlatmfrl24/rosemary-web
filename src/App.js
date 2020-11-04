import "axios";
import { useEffect, useState } from "react";
import { Container, Header, Item, Menu, Segment, Form, TextArea, Button } from "semantic-ui-react";

function App() {

  const newListAPI = 'https://us-central1-soulkey-rosemary.cloudfunctions.net/newList'
  const clearAPI = 'https://us-central1-soulkey-rosemary.cloudfunctions.net/clearNewList'
  const [pageState, setPageState] = useState('newlist')
  const [itemList, setItemList] = useState([])
  const handleMenuClick = (e, {name}) => setPageState(name)

  useEffect(()=>{
    callNewList()
  },[])

  const callNewList = async () => {
    const response = await fetch(newListAPI)
    const data = await response.json()
    setItemList(data)
   }

  const callClearNewList = async () => {
    await fetch(clearAPI) 
  }

  const newList = () => {
    return (
      <Item.Group divided style={{marginLeft:'1rem'}}>
      {
        itemList.map(item => {
          return (
            <Item>
              <Item.Content as='a' href={item.url} target='_blank'>
                <Item.Header >{item.name}</Item.Header>
                <Item.Meta>{item.url}</Item.Meta>
                <Item.Description>{item.code}</Item.Description>
                <Item.Extra>{item.type}</Item.Extra>
              </Item.Content>
            </Item>
          )
        })
      }
    </Item.Group>
    )
  }

  const copyCollection = () => {
    const codelist = itemList.map(item => {
      return item.code
    }).join('\n')
    return (
      <Container>
      <Button onClick={()=>callClearNewList()} >Remove All</Button> 
      <Segment>
        <Form>
          <TextArea style={{height:'50vh'}}  placeholder='Tell us more' value = {codelist}/>
        </Form>
      </Segment>
      </Container>
    )
  }

  return (
    <div className="App">
      <Container style={{marginTop: '3em', marginBottom:'3em'}}>
        <Header as='h1' style={{marginLeft:'1rem'}}>Rosemary</Header>
        <Menu>
        <Menu.Item
          name='newlist'
          active={pageState === 'newlist'}
          onClick={handleMenuClick}>
          New List
        </Menu.Item>

        <Menu.Item
          name='codecollection'
          active={pageState === 'codecollection'}
          onClick={handleMenuClick}>
          Code Collection
        </Menu.Item>

      </Menu>
      {
        (pageState === 'newlist')? newList() : copyCollection()
      }
      </Container>
    </div>
  );
}

export default App;
