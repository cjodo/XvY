let runtime!: runtimeEnv;
let PORT = process.env.PORT;

type runtimeEnv = `http://localhost:` | "https://xv-y.vercel.app";

if (process.env.NODE_ENV === "development") {
  runtime = "http://localhost:" + PORT;
} else if (process.env.NODE_ENV === "production") {
  runtime = "https://xv-y.vercel.app";
}

if (!runtime) {
  throw new Error("Unable to determine runtime");
}

export default runtime;
