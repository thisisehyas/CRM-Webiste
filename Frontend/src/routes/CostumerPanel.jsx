import CostumerPanelHeader from "../components/Costumer/CostumerPanelHeader";
import OrderInfoBox from "../components/Costumer/OrderInfoBox";

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
