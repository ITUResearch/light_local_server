import React from "react";
import axios from "axios";
import { RFID } from "../consts";
const qs = require("query-string");

class NFCTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = { buttonActive: true };
    const parsed = qs.parse(props.location.search);
    if (!parsed.m) return;
    const infos = parsed.m.split("x");
    if (infos[0]) {
      this.state.uid = infos[0];
    }
    if (infos[1]) {
      this.state.counter = infos[1];
    }
    this.saveNFCTag = this.saveNFCTag.bind(this);
  }

  async saveNFCTag(event) {
    const { uid, counter } = this.state;
    this.setState({ buttonActive: false });
    const res = await axios.post(`${RFID.RFID_URL}${RFID.NFC}`, {
      uid,
      counter
    });
    window.Materialize.toast(res.data, 4000);
  }

  render() {
    let { uid, counter, buttonActive } = this.state;
    uid = uid || "need uid";
    counter = counter || "need counter";
    return (
      <div>
        <div style={{ margin: "15px 0px" }} className="row">
          <div className="col s12 orange darken-1 center">
            NFC TAG INFORMATION
          </div>
        </div>
        <div style={{ margin: "15px 0px" }} className="row">
          <div className="col s3 grey lighten-1">Your UID</div>
          <div className="col s9 grey lighten-2">{uid}</div>
        </div>
        <div style={{ margin: "15px 0px" }} className="row">
          <div className="col s3 grey lighten-1">Counter</div>
          <div className="col s9 grey lighten-2">{counter}</div>
        </div>
        <div style={{ margin: "15px 0px" }} className="row">
          <div className="col s12 center">
            <a
              className={
                buttonActive ? "waves-effect waves-light btn" : "btn disabled"
              }
              onClick={this.saveNFCTag}
            >
              Save Tag
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NFCTag;
