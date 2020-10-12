import React from "react";
import Carousel from "react-bootstrap/Carousel";

const Home = () => {
  return (
    <div className="text-center">
      <img
        src="/sd-bank-logo.jpeg"
        className="p-5"
        alt="logo"
        width={500}
        height={250}
      />
      <hr />
      <h4 style={{ fontStyle: "italic" }}>Donde tu dinero esta seguro</h4>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://placehold.it/2980x1080"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://placehold.it/2980x1080"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://placehold.it/2980x1080"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="row p-5">
        <div className="col-lg-4 mb-4">
          <div className="card h-100">
            <h4 className="card-header">Card Title</h4>
            <div className="card-body">
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Sapiente esse necessitatibus neque.
              </p>
            </div>
            <div className="card-footer">
              <a className="btn btn-primary">Learn More</a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card h-100">
            <h4 className="card-header">Card Title</h4>
            <div className="card-body">
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Reiciendis ipsam eos, nam perspiciatis natus commodi similique
                totam consectetur praesentium molestiae atque exercitationem ut
                consequuntur, sed eveniet, magni nostrum sint fuga.
              </p>
            </div>
            <div className="card-footer">
              <a className="btn btn-primary">Learn More</a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card h-100">
            <h4 className="card-header">Card Title</h4>
            <div className="card-body">
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Sapiente esse necessitatibus neque.
              </p>
            </div>
            <div className="card-footer">
              <a className="btn btn-primary">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
