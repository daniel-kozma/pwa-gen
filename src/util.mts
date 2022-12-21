import { exec, ExecException } from "child_process"

export const cmd = (...commands: string[]): Promise<string | ExecException> => 
new Promise((res, rej) => 
  exec(commands.join(" && "), (err, stdout, stderr) => {
    if (err)return rej(err)
    if (stderr)return rej(stderr)
    return res(stdout)
  })
)