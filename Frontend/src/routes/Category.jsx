import ProductsCols from "../components/ProductsCols";
import WaveSvg from "../components/WaveSvg";
import Header from "../components/Header.jsx";
import CategoryMiddle from "../components/CategoryMiddle.jsx";

const Category = (props) => {
  return (
    <>
      <Header title="نام‌دسته‌بندی" svg="1" />
      <CategoryMiddle />
      <WaveSvg />
      <ProductsCols badgeName="محصولات" containName="true" />
    </>
  );
};

export default Category;

// categoryMiddle is not complete