import { Logo } from "./common/Logo";

function App() {
  return (
    <>
      <Logo className="w-[100px] text-slate-300" />
      <h1>Heading 1</h1>
      <h1 className="alt mt-10">Heading 1 ALt</h1>
      <input type="text" placeholder="Enter Name" />
      <button className="mt-10 ml-4">Sign up</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit quisquam
        qui et accusamus nesciunt dignissimos vitae, labore consequatur sint ab
        vero, neque velit quam repudiandae omnis nihil dolorum aspernatur
        distinctio?
      </p>
    </>
  );
}

export default App;
