import { Openlayers, Button } from '../../src/.';
interface DrawProps {
  point?: any;
  drawstart?: any;
  drawend?: any;
  change?: any;
  clear?: any;
  modifyend?: any;
}

const App = ({ point, drawstart, drawend, change, clear, modifyend }: DrawProps) => {
  const onDrawstart = (val: any) => {
    drawstart && drawstart(val);
  };
  const onDrawend = (val: any) => {
    drawend && drawend(val);
  };
  const onChange = (val: any) => {
    change && change(val);
  };
  const onClear = (val: any) => {
    clear && clear(val);
  };
  const onModifyend = (val: any) => {
    modifyend && modifyend(val);
  };
  const handleRemove = (map: any) => {};
  return (
    <>
      <Openlayers.Draw
        type="wkt"
        point={point}
        drawstart={onDrawstart}
        drawend={onDrawend}
        change={onChange}
        clear={onClear}
        modifyend={onModifyend}
        remove={handleRemove}
      ></Openlayers.Draw>
    </>
  );
};

export default App;
