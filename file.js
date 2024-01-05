const Tesseract = require('tesseract.js');
const path=require("path")


async function extractInfo(imagePath) {
  try {
    const { data: { text } } = await Tesseract.recognize(
      imagePath,
      'eng', 
      {
        logger: (info) => console.log(info), 
      }
    );


    const lines = text.split('\n');
    let questionNumber, checkboxValue;

    for (const line of lines) {
      const match = line.match(/^(\d+)\.\s(.+)/);
      if (match) {
        questionNumber = match[1].trim();
      }

      if (line.includes('☑')) {
        checkboxValue = line.trim().replace('☑', '');
      }
    }

    if (questionNumber && checkboxValue) {
      console.log(`${questionNumber} : ${checkboxValue}`);
    } else {
      console.log('Unable to extract information from the image.');
    }
  } catch (error) {
    console.error('Error extracting information:', error.message || error);
  }
}
const inputImageRelativePath = 'assets/image1.jpg';

const imagePath = path.join(__dirname, inputImageRelativePath);
extractInfo(imagePath);






