import { Div } from "components/lessons/Preview/Div";

const DisplayFlexPreview = () => {
  return (
    <Div.Parent>
      <Div.Child color="blue" index={1} />
      <Div.Child color="blue" index={2} />
    </Div.Parent>
  );
};

export default DisplayFlexPreview;
