import { exec } from "child_process";
export const cmd = (...commands) => new Promise((res, rej) => exec(commands.join(" && "), (err, stdout, stderr) => {
    if (err)
        return rej(err);
    if (stderr)
        return rej(stderr);
    return res(stdout);
}));
