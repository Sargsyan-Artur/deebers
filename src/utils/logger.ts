import { createLogger, format, transports } from "winston";

const alignColorsAndTime = format.combine(
  format.colorize({
    all: true,
  }),
  format.label({
    label: "[LOGGER]",
  }),
  format.timestamp({
    format: "YY-MM-DD HH:mm:ss",
  }),
  format.printf(
    (info) =>
      ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
  )
);

export const logger = createLogger({
  level: "debug",
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), alignColorsAndTime),
    }),
  ],
});
