import React, { useState, useContext, useEffect } from 'react'
import Select from 'react-select';
import AuthService from "../services/auth.service";
import { Context } from '../Store'
import Loader from '../components/Loader'

export default function Login() {
  const [, setState] = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [kafkaConnectServer, setKafkaConnectServer] = useState("");
  const [serverOptions, setServerOptions] = useState([]);

  useEffect(() => {
    let cancel = false;

    const getServers = async () => {
      setLoading(true)
      fetch('/kafka-connect-server/servers')
        .then(res => res.json())
        .then(data => {
          if(cancel) return;
          let options = data.map(d => ({ value: d, label: d }))
          setServerOptions(options)
          setKafkaConnectServer(options[0])
          setLoading(false)
        })
    }

    getServers()
    return () => {
      cancel = true;
    }
  }, []);


  const onChangeUsername = (e) => {
    const username = e.target.value
    setUsername(username)
  };

  const onChangePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  };

  const handleKafkaConnectServerChange = (selectedOption) => {
    setKafkaConnectServer(selectedOption)
  }

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    AuthService.login(username, password).then(
      (token) => {
        setState(state => ({ ...state, token: token, kafkaConnectServer: kafkaConnectServer.value }))
        localStorage.setItem('token', token)
        localStorage.setItem('kafkaConnectServer', kafkaConnectServer.value)
        setLoading(false);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );

  };


  return (
    <>
      <section className="absolute w-full h-full">
        <div className="absolute top-0 w-full h-full bg-indigo-100"></div>
        {loading && (<Loader />)}
        <div className="container h-full px-4 mx-auto">
          <div className="flex items-center content-center justify-center h-full">
            <div className="w-full px-4 lg:w-4/12">
              <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-indigo-300 border-0 rounded-lg shadow-lg">
                <div className="px-6 py-6 mb-0 rounded-t">
                  <div className="mb-3 text-center">
                    <h6 className="text-sm font-bold text-gray-600">
                      Log in
                    </h6>
                  </div>
                  <div className="text-center btn-wrapper">
                  </div>
                  <hr className="mt-6 border-gray-400 border-b-1" />
                </div>
                <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                  <form className="webflow-style-input" onSubmit={handleLogin}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block mb-2 text-xs font-bold text-gray-700 uppercase"
                        htmlFor="grid-password"
                      >
                        Username
                      </label>
                      <input
                        type="username"
                        className="w-full px-3 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white border-0 rounded shadow focus:outline-none focus:ring"
                        placeholder="Username"
                        style={{ transition: "all .15s ease" }}
                        value={username}
                        onChange={onChangeUsername}
                        required
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block mb-2 text-xs font-bold text-gray-700 uppercase"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white border-0 rounded shadow focus:outline-none focus:ring"
                        placeholder="Password"
                        style={{ transition: "all .15s ease" }}
                        value={password}
                        onChange={onChangePassword}
                        required
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block mb-2 text-xs font-bold text-gray-700 uppercase"
                        htmlFor="grid-password"
                      >
                        Kafka Server
                      </label>
                      <Select
                        value={kafkaConnectServer}
                        defaultValue={kafkaConnectServer}
                        onChange={handleKafkaConnectServerChange}
                        options={serverOptions}
                      />
                    </div>

                    <div className="mt-6 text-center">
                      <button
                        className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-gray-900 rounded shadow outline-none active:bg-gray-700 hover:shadow-lg focus:outline-none"
                        type="submit"
                        style={{ transition: "all .15s ease" }}
                        disabled={loading}
                        onClick={handleLogin}>
                        Log In
                      </button>
                    </div>
                    {message && (
                      <div className="form-group">
                        <div className="text-red-500" role="alert">
                          {message}
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
