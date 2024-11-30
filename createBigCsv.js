import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";

const generateBRPhoneNumber = () => {
  const getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const ddd = getRandomNumber(11, 99);
  const firstPart = getRandomNumber(1000, 9999);
  const secondPart = getRandomNumber(1000, 9999);

  return `(${ddd}) ${firstPart}-${secondPart}`;
};

const generateBigCsv = (linesQuantity) => {
  const filePath = path.join(path.resolve(process.cwd()), "big.csv");
  const writeStream = fs.createWriteStream(filePath);

  writeStream.write("name,email,phone\n");

  for (let i = 0; i < linesQuantity; i++) {
    writeStream.write(
      `${faker.person.firstName().toLowerCase()},${faker.internet
        .email()
        .toLowerCase()},${generateBRPhoneNumber()}\n`
    );
  }

  writeStream.end();

  return filePath;
};

generateBigCsv(100000);
