import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "redux/AuthSlice";
import { Images, Elements } from "assets/Assets";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/users");
        const nth = Math.floor(Math.random() * response.data.users.length);
        setUsername(response.data.users[nth].username);
        setPassword(response.data.users[nth].password);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0F2027]">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className=" flex justify-center items-center bg-[#0F2027] h-screen">
      <img
        loading="eager"
        width={500}
        height={500}
        src={Elements.filledcircle2}
        alt="filledhalfcircle2"
        className="absolute -top-20 left-20 w-1/3 scale-70 "
      />
      <div className="flex flex-col min-w-80 sm:flex-row w-[70vw] h-[90vh] sm:h-[70vh] bg-white overflow-hidden rounded-2xl relative">
        <div
          className="absolute inset-0 z-10 hidden sm:block"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.5) 10%, rgba(0,0,0,0) 30%)",
          }}
        ></div>
        <div className="overflow-hidden w-full sm:w-2/3 relative">
          <img
            loading="eager"
            src={Images.loginbg}
            alt="loginbg"
            className="w-full object-cover h-full object-top"
            width={800}
            height={600}
          />
        </div>
        <div className="w-full xl:w-1/3 sm:min-w-1/3 relative p-10 ">
          <h1 className="text-4xl font-medium">Welcome</h1>
          <h1 className="text-4xl font-medium">Back</h1>
          <div className="my-5 relative z-50">
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
              <div className="flex w-full items-center gap-5 justify-between">
                <div className="flex items-center gap-1 w-full">
                  <input type="checkbox" name="remember" id="remember" />
                  <label htmlFor="remember" className="text-[12px] ">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-[12px] text-blue-400 w-full">
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
          <svg
            className="absolute h-35 -left-90 top-60 -rotate-90 z-0 hidden sm:block"
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
      </div>
    </div>
  );
};

export default Login;
