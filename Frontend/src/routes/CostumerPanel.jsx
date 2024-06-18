import CostumerPanelHeader from "../components/Costumer/CostumerPanelHeader";
import OrderInfoBox from "../components/Costumer/OrderInfoBox";
import "../styles/font.css";

const CostumerPanel = () => {
  return (
    <>
      <CostumerPanelHeader />
      <div style={{ marginRight: "10px", marginLeft: "10px" }}>
        <OrderInfoBox />
      </div>
    </>
  );
};

export default CostumerPanel;
