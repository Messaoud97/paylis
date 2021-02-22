// import React, { Component } from "react";

// class History extends Component {
//   state = {};

//   componentDidMount() {
//     console.log("history.jsx");
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <h3 className="fahmi">History</h3>
       

//         <ul class="list-group">
//           {this.props.ech.map(el => (
//             <li class="list-group-item">
//               <div className="row">
//                 <div className={this.classy(el)}>
//                   Amount : <p className="text-danger">{el.amount} IMFT</p>
//                   DeadLine : {new Date(el.deadL * 1000).toString()} <br /> State
//                   :{" "}
//                   {el.state === 0 ? (
//                     "Not Paid"
//                   ) : (
//                     <small className="green-text">Already Paid</small>
//                   )}
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </React.Fragment>
//     );
//   }

//   classy(el) {
//     let str = "col fahmi";
//     if (el.state !== 0) return (str += " alert alert-dark");
//     else return str;
//   }
// }

// export default History;
import React, { Component } from "react";

class History extends Component {
  state = {
    pEch: []
  };

  componentDidMount() {
    console.log("history.jsx");
    console.log("upToPay.jsx");
    let pEch = this.props.ech.filter(p => p.state === 1);
    console.log("azerty");
    this.setState({ pEch });
  }

  render() {
    return (
      <React.Fragment>
        <h3 className="fahmi">History</h3>
        {/* 
        {this.props.ech.map(el => (
          <div className="alert alert-dark" key={el.deadL}>
            <b> Amount : {el.amount} $ -- </b>
            <b>DeadLine : {new Date(el.deadL * 1000).toDateString()} --</b>
            <b>State : {el.state === 0 ? "Not Paid" : "Already Paid"}</b>
          </div>
        ))}
        */}

        <ul class="list-group">
          {this.state.pEch.map(el => (
            <li class="list-group-item">
              <div className="row">
                <div className={this.classy(el)}>
                  Amount : <p className="text-danger">{el.amount} IMFT</p>
                  DeadLine : {new Date(el.deadL * 1000).toString()} <br /> State
                  :{" "}
                  {el.state === 0 ? (
                    "Not Paid"
                  ) : (
                    <small className="green-text">Already Paid</small>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }

  classy(el) {
    let str = "col fahmi";
    if (el.state !== 0) return (str += " alert alert-dark");
    else return str;
  }
}

export default History;
