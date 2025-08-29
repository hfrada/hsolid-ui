import { createSignal, type Component } from "solid-js";
import "tippy.js/dist/tippy.css";
import * as FUI from "./main"

const App: Component = () => {

  const [show, setShow] = createSignal(false)
  const [text, setText] = createSignal("1234")
  const [tab, setTab] = createSignal(1)

  return (
    <div class="p-5">
      <h1 class="text-xl font-bold">Tooltips</h1>
      <div class="mx-auto w-fit">
        <FUI.FUITooltip
          as="p"
          text={text()}
          show={() => show()}
          class="mx-auto w-fit"
        >Dynamic: {text()}</FUI.FUITooltip>
        <FUI.FUITooltip
          as="p"
          text={text()}
          // show={() => show()}
          class="mx-auto w-fit"
        >Always: {text()}</FUI.FUITooltip>
        <FUI.FUITooltip.Clipped
          as="p"
          text={text()}
          class="mx-auto w-fit max-w-20 truncate"
        >Clipped: {text()}</FUI.FUITooltip.Clipped>
        <input class="bg-red-100" value={text()} onInput={(e) => setText(e.target.value)} />
        <button type="button" class="bg-gray-100 cursor-pointer" onClick={() => setShow((s) => !s)}>
          show: {show().toString()}
        </button>

      </div>

      <hr class="my-3" />
      <h1 class="text-xl font-bold mb-3">Table</h1>
      <FUI.FUITable
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

      <hr class="my-3" />
      <h1 class="text-xl font-bold mb-3">Tabs</h1>
      <FUI.FUITabs
        value={tab()}
        items={[
          { name: "Tab 1", value: 1 },
          { name: "Tab 2", value: 2 },
          { name: "Tab 3", value: 3 },
        ]}
        onChange={(v) => setTab(v || 1)}
      />
    </div>
  );
};

export default App;
