import 'bootstrap/dist/css/bootstrap.min.css';

const Chat = () => (
  <section id="chat">
    <div className="container">
      <div className="row align-items-center justify-content-center h-100">
        <div className="col-lg-4 col-sm-12">
          <ul className="list-group p-3 rounded">
            <li className="list-group-item">User 1</li>
            <li className="list-group-item">User 2</li>
            <li className="list-group-item">User 3</li>
            <li className="list-group-item">User 4</li>
            <li className="list-group-item">User 5</li>
          </ul>
        </div>
        <div className="col-lg-8 col-sm-12">
          <div className="col-3 rounded w-100 mb-3">
            <div className="message-old p-5">
              <p>Chat old text</p>
            </div>
          </div>
        <div className="col-lg-8 col-sm-12 p-3 rounded">
          <form className="row message-form g-3">
            <div className="message-text col-auto">
              <input type="message" className="form-control" id="inputMessage" placeholder="Write message"></input>
            </div>
            <div className="message-send col-auto">
              <button type="submit" className="btn-send btn btn-primary">Send</button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  </section >
);

export default Chat;