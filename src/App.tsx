import { createSignal, type Component } from "solid-js";
import "tippy.js/dist/tippy.css";
import Tooltip from "./components/overlay/Tooltip";
import FUITable from "./components/table/Table";

const App: Component = () => {

  const [show, setShow] = createSignal(false)
  const [text, setText] = createSignal("1234")

  return (
    <div>
      <div class="mx-auto w-fit mt-33">
        <Tooltip
          as="p"
          text={text()}
          show={() => show()}
          class="mx-auto w-fit"
        >Dynamic: {text()}</Tooltip>
        <Tooltip
          as="p"
          text={text()}
          // show={() => show()}
          class="mx-auto w-fit"
        >Always: {text()}</Tooltip>
        <Tooltip.Clipped
          as="p"
          text={text()}
          class="mx-auto w-fit max-w-20 truncate"
        >Clipped: {text()}</Tooltip.Clipped>
        <input class="bg-red-100" value={text()} onInput={(e) => setText(e.target.value)} />
        <button type="button" class="bg-gray-100 cursor-pointer" onClick={() => setShow((s) => !s)}>
          show: {show().toString()}
        </button>

      </div>
      <hr class="my-3" />
      <FUITable
        sortValue={{
          key: "1",
        }}
        headers={[
          {
            header: {
              info: "123",
              name: "Header 1",
              sort: { key: "1" },
            },
            col: {
              render: () => "Render 1",
            },
          },
          {
            header: {
              name: "Header 2",
            },
            col: {
              render: () => "Render 2",
            },
          },
        ]}
        items={Array(10)}
      />
    </div>
  );
};

export default App;
