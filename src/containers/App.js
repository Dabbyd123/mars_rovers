import React, { Component } from 'react';
import CardList from '../components/CardList';
import Rovers from '../components/Rovers';
import Loading from '../components/Loading';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import '../containers/App.css';

class App extends Component {
  state = {
    rover: {
      name: '',
      landing_date: '',
      max_date: '',
      active: false
    },
    photos: [
      {
        image: '',
        camera: '',
      }
    ],
    isOpen: false,
    isLoading: false,
    photoIndex: 0
  }


  imageDate = React.createRef();


  onSubmitHandler = async () => {
    try {
      const dateValue = this.imageDate.current.value;
      const rover = this.state.rover.name;
      const myKey = 'wmdSvbEPSSpfZc9g6WaDqWZqlmsZhFYLs6jElBeQ';
      const baseURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${dateValue}&api_key=${myKey}`;
      this.setState({
        isLoading: true
      })
      const response = await fetch(baseURL);
      const data = await response.json();
      this.setState({
        photos: data.photos.map(photo => {
          return (
            {
              image: `${photo.img_src}`,
              camera: `${photo.camera.full_name}`
            }
          )
        }),
        isLoading: false
      })
    }
    catch (err) {
      console.log('failed to fetch photos, make sure you are requesting a day within date range given.', err)
    }
  }


  roverClickHandler = async (e) => {
    const rover = e.target.id;
    await this.setState({
      rover: {
        name: rover
      },
      isLoading: true
    })
    await this.toggleActiveRover();
    try {
      const myKey = 'wmdSvbEPSSpfZc9g6WaDqWZqlmsZhFYLs6jElBeQ';
      const baseURL = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${myKey}`;
      const response = await fetch(baseURL);
      console.log(response.status);
      const data = await response.json();
      await this.setState({
        rover: {
          name: `${data.photo_manifest.name}`,
          landing_date: `${data.photo_manifest.landing_date}`,
          max_date: `${data.photo_manifest.max_date}`,
          active: true
        },
        photos: [
          {
            image: '',
            camera: ''
          }
        ],
        isLoading: false
      });
      this.imageDate.current.value = ''
    }
    catch (err) {
      console.log('failed to fetch data', err)
    }
  }


  toggleActiveRover = () => {
    const allRovers = document.querySelectorAll('.rover');
    const currentRover = this.state.rover.name;
    allRovers.forEach(e => {
      if (e.id === currentRover) {
        return e.classList.add(`${currentRover}_active`)
      } else if (e.classList !== e.id) {
        return e.classList.remove(`${e.id}_active`)
      }
    })
  }



  render() {

    const { isOpen, rover, photos, photoIndex, isLoading } = this.state;

    return (
      <div className="App" >
        <div className="wrapper">
          <h1 className="header">Mars Rovers</h1>
          <div className="instructions">

            {
              rover.active !== true ?
                <h4>Please select a Rover</h4>
                : <h4>You have selected the {rover.name}</h4>
            }

          </div>

          <Rovers clickHandler={this.roverClickHandler} />


          {
            rover.active === true ?
              <div className="date-wrapper">
                <h4 className="dateP">
                  Choose a date between {rover.landing_date} and {rover.max_date} to see the pictures that {rover.name} took that day.
                </h4>
                <div className="dateBox">
                  <input
                    type="date"
                    min={rover.landing_date}
                    max={rover.max_date}
                    ref={this.imageDate}
                  />
                </div>
                <div className="dateButton">
                  <button type="button" className="submit pill" onClick={this.onSubmitHandler}>Submit</button>
                </div>
              </div>
              : null
          }

        </div>

        {
          isLoading === true ?
            <Loading />
            : null
        }

        {
          photos.length > 1 && isLoading === false ?
            <div>
              <div className="lightBox_button">
                <button type="button" className="fullScreen pill" onClick={() => this.setState({ isOpen: true })}>
                  View Images Fullscreen
              </button>
              </div>
              <CardList photos={photos} />
              {isOpen && (
                <Lightbox
                  mainSrc={photos[photoIndex].image}
                  nextSrc={photos[(photoIndex + 1) % photos.length]}
                  prevSrc={photos[(photoIndex + photos.length - 1) % photos.length].image}
                  onCloseRequest={() => this.setState({ isOpen: false })}
                  onMovePrevRequest={() =>
                    this.setState({
                      photoIndex: (photoIndex + photos.length - 1) % photos.length,
                    })
                  }
                  onMoveNextRequest={() =>
                    this.setState({
                      photoIndex: (photoIndex + 1) % photos.length,
                    })
                  }
                />
              )}
            </div>
            : null
        }

      </div>
    );
  }
}

export default App;
