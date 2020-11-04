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

  const newList = () => {
    return isLoading ? (
      <Placeholder>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    ) : itemList.length === 0 ? (
      <Message info>
        <Message.Header>No Item in Currently..</Message.Header>
        <p>Come back after few Hours.. See you!</p>
      </Message>
    ) : (
      <Item.Group divided style={{ marginLeft: "1rem" }}>
        {itemList.map((item) => {
          return (
            <Item>
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
    return (
      <Container>
        <Button onClick={() => callClearNewList()}>Remove All</Button>
        <Segment>
          <Form>
            <TextArea
              style={{ height: "50vh" }}
              placeholder="Empty New List.. :)"
              value={codelist}
            />
          </Form>
        </Segment>
      </Container>
    );
  };

  return (
    <div className="App">
      <Container style={{ marginTop: "3em", marginBottom: "3em" }}>
        <Header as="h1" style={{ marginLeft: "1rem" }}>
          Rosemary
        </Header>
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
