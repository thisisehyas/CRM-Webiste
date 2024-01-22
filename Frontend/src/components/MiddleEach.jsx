import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "../styles/middleEach.css";
import "../styles/fontSize.css";

const MiddleEach = (props) => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <p
              className="change-font first-p"
              style={{ direction: "rtl", textAlign: "right" }}
            >
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
              جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
              فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری
              موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد
              نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل
              دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </p>
          </Col>
          <Col>
            <Image
              style={{ width: "70%", marginLeft: "20%" }}
              src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/111/750/original/produkt_g64-1_1.png?1705960740"
              alt="عکس محصول"
            ></Image>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-row">
            <Row>
              <Col className="mb-3">
                <Image
                  className="sub-image "
                  src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/111/753/original/ruttmann_sortierprodukt_03-300x300_1.png?1705962952"
                ></Image>
              </Col>
              <Col className="mb-3">
                <Image
                  className="sub-image"
                  src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/111/754/original/ruttmann_sortierprodukt_07-300x300_1.png?1705962961"
                ></Image>
              </Col>
            </Row>
            <Row>
              <Col className="ml-2">
                <Image
                  className="sub-image"
                  src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/111/755/original/ruttmann_sortierprodukt_04-300x300_1.png?1705962968"
                ></Image>
              </Col>
              <Col className="ml-2">
                <Image
                  className="sub-image"
                  src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/111/756/original/ruttmann_sortierprodukt_02-300x300_1.png?1705962979"
                ></Image>
              </Col>
            </Row>
          </Col>
          <Col>
            <p className="second-p change-font">
              <h5 className="text-center">مشخصات فنی</h5>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MiddleEach;

// fontsize of the title of مشخصات فنی
// i would like the height of the columns in a row to be the same
