
/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555,
    bookingTime: new Date(),
  },
  {
    id: 2, name: 'Rose', phone: 88884444,
    bookingTime: new Date(),
  },
  {
    id: 3, name: 'Tom', phone: 88883333,
    bookingTime: new Date(),
  },
  {
    id: 4, name: 'Jerry', phone: 88882222,
    bookingTime: new Date(),
  },
  {
    id: 5, name: 'Mary', phone: 88881111,
    bookingTime: new Date(),
  },
  {
    id: 6, name: 'John', phone: 88880000,
    bookingTime: new Date(),
  },
  {
    id: 7, name: 'Lucy', phone: 88889999,
    bookingTime: new Date(),
  }
];


function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/ }
  const traveller = props.traveller;
  const formatTime = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

  return (
    <tr>
      {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
      <td>{formatTime(traveller.bookingTime)}</td>
    </tr>
  );
}

function Display(props) {

  /*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {props.travellers.map(traveller => (
          <TravellerRow key={traveller.id} traveller={traveller} />
        ))}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const form = document.forms.addTraveller;
    console.log("Add component/handleSubmit()", form.travellername.value); //check to make sure the pipeline is correct
    this.props.bookTraveller({ name: form.travellername.value, phone: form.travellerphone.value });
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
        {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" />
        <input type="text" name="travellerphone" placeholder="Phone" />
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    {/*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/ }
    const form = document.forms.deleteTraveller;
    console.log("Delete component/handleSubmit()", form.travellername.value); //check to make sure the pipeline is correct
    this.props.deleteTraveller(form.travellername.value);//use props to pass the value to the parent component
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
        {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" />
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    console.log("Homepage constructor", this.props.totalSeatNumber, this.props.occupiedSeatNumber);
    this.freeSeats = this.props.totalSeatNumber - this.props.occupiedSeatNumber;
  }
  render() {
    return (
      <div>
        <p>There are {this.freeSeats} free seats available out of {this.props.totalSeatNumber} total seats.</p>
        <DisplayFreeSeats total={this.props.totalSeatNumber} free={this.freeSeats} />
      </div>
    );
  }
}

class DisplayFreeSeats extends React.Component {
  constructor(props) {
    super(props);
    this.state = { total: this.props.total, free: this.props.free };
  }
  render() {
    const seatStyle = {
      width: '40px',
      height: '40px',
      borderRadius: '5px',
      backgroundColor: 'lightgreen',
    };

    const occupiedSeatStyle = {
      ...seatStyle,
      backgroundColor: 'lightgrey',
    };

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px', width: 'fit-content' }}>
        {/* 使用 Array.from 来渲染座位 */}
        {Array.from({ length: this.state.total }, (_, index) => (
          <div
            key={index}
            style={index < this.state.free ? seatStyle : occupiedSeatStyle}
          ></div>
        ))}
      </div>
    );
  }
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = {
      travellers: [], selector: 1,
      totalSeatNumber: 10,
      occupiedSeatNumber: initialTravellers.length,
      maxId: initialTravellers.length
    };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value) {
    /*Q2. Function to set the value of component selector variable based on user's button click.
     different components:
     Homepage: 1
      Display: 2
      Add: 3
      Delete: 4
    */
    console.log("setSelector", value);
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate() {
    console.log("componentDidUpdate(onChange)", this.state.travellers);
    if (this.state.occupiedSeatNumber !== this.state.travellers.length) {
      this.setState({ occupiedSeatNumber: this.state.travellers.length });
    }
  }
  loadData() {
    setTimeout(() => {
      this.setState({
        travellers: initialTravellers
      });
    }, 500);
  }

  bookTraveller(passenger) {
    /*Q4. Write code to add a passenger to the traveller state variable.*/
    console.log("TicketToRide/bookTraveller function:", passenger);
    if (this.state.travellers.length >= this.state.totalSeatNumber) {
      alert("All seats have been booked.");
      return;
    }
    //actual addition
    this.setState({ 
      travellers: [...this.state.travellers, { id: this.state.maxId+1, name: passenger.name, phone: passenger.phone, bookingTime: new Date() }],
      maxId: this.state.maxId+1
    });
  }

  deleteTraveller(passenger) {
    /*Q5. Write code to delete a passenger from the traveller state variable.*/
    console.log("TicketToRide/deleteTraveller function:", passenger);
    if (this.state.travellers.length === 0) {
      alert("No travellers to delete.");
      return;
    }
    //actual deletion
    var newlist = [];
    // this refers to TicketToRide or the caller of the function(Class Delete)
    // way to solve: bind this to the function to clarify that this refers to the class TicketToRide
    this.state.travellers.forEach(element => {
      if (element.name !== passenger) {
        newlist.push(element);
      }
    if (newlist.length === this.state.travellers.length) {
      alert("Traveller not found.");
    } else {
      console.log("Traveller deleted successfully.");  this.setState({ travellers: newlist });
    }
    // console.log(this.state.travellers); //won't work because setState is asynchronous
  });
  }

  render() {
    const navStyle = {
      ul: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        backgroundColor: '#333',
        color: 'white',
        fontSize: '1rem'
      },
      li: {
        float: 'left',
        fontSize: '1rem',
        display: 'block',
        color: 'white',
        textAlign: 'center',
        padding: '14px 16px',
        textDecoration: 'none'
      },
      liHover: {
        float: 'left',
        fontSize: '1rem',
        display: 'block',
        color: 'white',
        textAlign: 'center',
        padding: '14px 16px',
        textDecoration: 'none',
        backgroundColor: 'darkgreen'
      }
    };

    return (
      <div>
        <h1>Ticket To Ride</h1>
        <div>
          {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
          <nav>
            <ul style={navStyle.ul}>
              <li style={this.state.selector === 1 ? navStyle.liHover : navStyle.li} onClick={() => this.setSelector(1)}>Homepage</li>
              <li style={this.state.selector === 2 ? navStyle.liHover : navStyle.li} onClick={() => this.setSelector(2)}>Display</li>
              <li style={this.state.selector === 3 ? navStyle.liHover : navStyle.li} onClick={() => this.setSelector(3)}>Add</li>
              <li style={this.state.selector === 4 ? navStyle.liHover : navStyle.li} onClick={() => this.setSelector(4)}>Delete</li>
            </ul>
          </nav>
        </div>
        <div style={{ margin: "2rem 1rem" }}>
          {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
          {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
          {this.state.selector === 1 && <Homepage totalSeatNumber={this.state.totalSeatNumber} occupiedSeatNumber={this.state.occupiedSeatNumber} />}
          {/*Q3. Code to call component that Displays Travellers.*/}
          {this.state.selector === 2 && <Display travellers={this.state.travellers} />}
          {/*Q4. Code to call the component that adds a traveller.*/}
          {this.state.selector === 3 && <Add bookTraveller={this.bookTraveller} />}
          {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
          {this.state.selector === 4 && <Delete deleteTraveller={this.deleteTraveller} />}
        </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
