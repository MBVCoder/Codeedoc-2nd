import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../Redux/AuthSlice";
import { Images, Elements } from "../Assets/Assets.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");

  useEffect(() => {
    const nth = Math.floor(Math.random() * 30);
    const UsersData = async () => {
      const response = await axios.get("https://dummyjson.com/users");
      console.log(response.data.users[nth]);
      setUsername(response.data.users[nth].username);
      setPassword(response.data.users[nth].password);
    };
    UsersData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "https://dummyjson.com/auth/login",
        {
          username: username,
          password: password,
          expiresInMins: 30, // optional
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("accessToken", res.data.accessToken);
        dispatch(setCredentials(res.data));
        toast.success("Login Success");
        navigate("/");
      })
      .catch((err) => {
        console.error("Login error:", err);
        toast.error("Login error");
      });
  };

  return (
    <div className=" flex justify-center items-center bg-[#0F2027] h-screen">
      <img
      loading="lazy"
        src={Elements.filledcircle2}
        alt="filledhalfcircle2"
        className="absolute -top-20 left-20 w-1/3 scale-70 z-0"
      />
      <div className="flex flex-col xl:flex-row max-w-[60vw] max-h-[70vh] bg-white overflow-hidden rounded-2xl relative z-10">
        <div className="overflow-hidden xl:w-2/3 relative z-10">
          <img
          loading="lazy"
            src={Images.loginbg}
            alt="loginbg"
            className="w-full object-cover h-auto"
          />
          <svg
            className="absolute top-60 -right-70 h-40 w-full -rotate-90 opacity-0 2xl:opacity-100"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,122.7C96,149,192,203,288,192C384,181,480,107,576,69.3C672,32,768,32,864,64C960,96,1056,160,1152,165.3C1248,171,1344,117,1392,90.7L1440,64L1440,320L0,320Z"
            />
          </svg>
        </div>
        <div className="xl:w-1/3 p-10 z-50">
          <h1 className="text-4xl font-medium">Welcome</h1>
          <h1 className="text-4xl font-medium">Back</h1>
          <div className="my-5">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  type="text"
                  name="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your Name"
                  className="w-full border-2 border-gray-300 rounded-md p-1"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border-2 border-gray-300 rounded-md p-1"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <input type="checkbox" name="remember" id="remember" />
                  <label htmlFor="remember" className="text-[12px]">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-[12px]">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="bg-black border-2 border-black text-white p-3 rounded-md text-sm hover:bg-white hover:text-black hover:cursor-pointer transition-all duration-500"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
        <img
        loading="lazy"
          src={Elements.whitering}
          alt="whitering"
          className="absolute -bottom-45 -left-70 w-5/12 z-20"
        />
        <img
        loading="lazy"
          src={Elements.whitering}
          alt="whitering"
          className="absolute -bottom-20 -left-80 w-5/12 z-20"
        />
        <img
        loading="lazy"
          src={Elements.filledcircle1}
          alt="blackring"
          className="absolute -bottom-40 -right-40 w-1/3 scale-70 z-20"
        />
        <img
        loading="lazy"
          src={Elements.blackring}
          alt="blackring"
          className="absolute -bottom-35 -right-40 w-1/3 scale-70 z-20"
        />
        <img
        loading="lazy"
          src={Elements.blackring}
          alt="blackring"
          className="absolute -bottom-38 -right-40 w-1/3 scale-70 z-20"
        />
        <h1 className="absolute top-60 -left-40 text-5xl leading-8  w-full text-white text-center z-10">
          Millineals Collaboration{" "}
          <h1>to optimize local potencial for society</h1> in wakatobi island
        </h1>
        <div
          className="absolute inset-0 z-20"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.5) 10%, rgba(0,0,0,0) 30%)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
