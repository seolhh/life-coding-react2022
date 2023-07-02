import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={function (event) {
            // 클릭이벤트를 할때 원래 aTag에 기본으로 있는 이벤트는 실행을 막고, props를 가져온다
            event.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a
          href={"/read/" + t.id}
          // 클릭하는 이벤트를 했을 때 함수 실행, a태그로 넘어가는 이벤트는 막고 props를 불러오도록 실행
          onClick={(event) => {
            event.preventDefault();
            // props의 id별로 불러와야 하니까 event의 target(aTag내에 있는 t.id)도 가져온다
            props.onChangeMode(event.target.id);
          }}
        >
          {t.title}
        </a>
      </li>
    );
  }
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function App() {
  // 초기 화면 기본값을 WELCOME으로 설정
  // mode는 원래 상태 그다음에오는 setMode는 바뀔 상태
  const [mode, setMode] = useState("WELCOME");
  const topics = [
    { id: 1, title: "html", body: "html is..." },
    { id: 2, title: "css", body: "css is..." },
    { id: 3, title: "javascript", body: "javascript is..." },
  ];
  let content = null;
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello,Sven"></Article>;
  } else if (mode === "READ") {
    content = <Article title="Read" body="Hello,Read"></Article>;
  }
  return (
    <div>
      <Header
        title="강아지"
        onChangeMode={() => {
          setMode("WELCOME");
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(id) => {
          setMode("READ");
        }}
      ></Nav>
      {content}
    </div>
  );
}

export default App;
