import "axios";
import { useEffect, useState } from "react";
import {
  Container,
  Header,
  Item,
  Menu,
  Segment,
  Form,
  TextArea,
  Button,
  Placeholder,
  Message,
  Icon,
  Popup,
  Modal
} from "semantic-ui-react";

function App() {
  const newListAPI =
    "https://us-central1-soulkey-rosemary.cloudfunctions.net/newList";
  const clearAPI =
    "https://us-central1-soulkey-rosemary.cloudfunctions.net/clearNewList";
  const [pageState, setPageState] = useState("newlist");
  const [itemList, setItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleMenuClick = (e, { name }) => setPageState(name);

  useEffect(() => {
    callNewList();
  }, []);

  const callNewList = async () => {
    setIsLoading(true);
    const response = await fetch(newListAPI);
    const data = await response.json();
    console.log("[msg]:: New list is Loaded.");
    setIsLoading(false);
    setItemList(data);
  };

  const callClearNewList = async () => {
    console.log("called clear new List");
    setIsLoading(true);
    await fetch(clearAPI);
    callNewList();
  };

  function copyIOS(string){
    var textarea = document.createElement('textarea');
    textarea.value = string;
  
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 9999);  // 추가
  
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  function RemoveAlertModal() {
    return (
      <Modal
        size={'mini'}
        trigger={<Button negative>Remove All</Button>}
        header='Reminder!'
        content='New Code List will be REMOVED all.'
        actions={['Cancel', { key: 'done', content: 'Done', negative: true, onClick:()=>{console.log(callClearNewList())} }]}
      />
    )
  }

  const loader = () => {
    return (
      <Placeholder>
        {
          [...Array(10).keys()].map(item => {
            return (
              <Placeholder.Paragraph key={item}>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            )
          })
        }
      </Placeholder>
    )
  }

  const newList = () => {
    return isLoading ? loader() : 
    itemList.length === 0 ? (
      <Message info>
        <Message.Header>No Item in Currently..</Message.Header>
        <p>Come back after few Hours.. See you!</p>
      </Message>
    ) : (
      <Item.Group divided style={{ marginLeft: "1rem" }}>
        {itemList.map((item) => {
          return (
            <Item key={item.code}>
              <Item.Content as="a" href={item.url} target="_blank">
                <Item.Header>{item.name}</Item.Header>
                <Item.Meta>{item.url}</Item.Meta>
                <Item.Description>{item.code}</Item.Description>
                <Item.Extra>{item.type}</Item.Extra>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    );
  };

  const copyCollection = () => {
    const codelist = itemList
      .map((item) => {
        return item.code;
      })
      .join("\n");
    return isLoading? loader() : (
      <Container>

        <Segment>
          <Form>
            <TextArea
              className="codelist"
              style={{ height: "50vh" }}
              placeholder="Empty New List.. :)"
              value={codelist}
            />
          </Form>
        </Segment>
        <div style={{textAlign: 'right'}}>
          <Popup
            content='Copied!'
            on='click'
            pinned
            trigger={<Button onClick={() => copyIOS(codelist)}>Copy to Clipboard</Button>}
          />
          {RemoveAlertModal()}
          {/* <Button negative onClick={() => callClearNewList()}>Remove All</Button> */}
        </div>

        
      </Container>
    );
  };

  return (
    <div className="App">
      <Container style={{ marginTop: "3em", marginBottom: "3em" }}>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <Header as="h1" style={{ marginLeft: "1rem" }}>
            Rosemary
          </Header>
          <Button icon onClick={() => callNewList()}>
            <Icon name='redo'/>
          </Button>
        </div>
        <div style={{display: "flex", textAlign:'right', flexDirection:'column', marginTop: "2em"}}>
          <Header as='h6'>
            Last Updated: { itemList[0] === undefined ? 'Loading..' : 
                ((new Date(itemList[0].createdTimestamp._seconds * 1000)).toLocaleString())
            }<br/><br/>
            Next Updated: { itemList[0] === undefined ? 'Loading..' : 
                ((new Date((itemList[0].createdTimestamp._seconds+4*3600) * 1000)).toLocaleString())
              }
          </Header>
        </div>

        <Menu>
          <Menu.Item
            name="newlist"
            active={pageState === "newlist"}
            onClick={handleMenuClick}
          >
            New List
          </Menu.Item>

          <Menu.Item
            name="codecollection"
            active={pageState === "codecollection"}
            onClick={handleMenuClick}
          >
            Code Collection
          </Menu.Item>
        </Menu>
        {pageState === "newlist" ? newList() : copyCollection()}
      </Container>
    </div>
  );
}

export default App;
