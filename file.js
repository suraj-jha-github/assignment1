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












// const Tesseract = require('tesseract.js');
// const fs = require('fs');
// const path=require("path")

// // Function to extract text using Tesseract OCR
// function extractText(imagePath) {
//   return new Promise((resolve, reject) => {
//     Tesseract.recognize(
//       imagePath,
//       'eng',
//       { logger: (info) => console.log(info) }
//     ).then(({ data: { text } }) => {
//       resolve(text.trim());
//     }).catch(reject);
//   });
// }

// // Function to extract user input from the extracted text
// function extractUserInput(text) {
//   const lines = text.split('\n');

//   // Assuming the checkbox is represented by ☑ and the options are separated by spaces
//   const checkboxRegex = /☑([^☑]*)/;
//   const checkboxMatch = lines.find(line => line.match(checkboxRegex));
//   const checkboxValue = checkboxMatch ? checkboxMatch.match(checkboxRegex)[1].trim() : 'No'; // Default to 'No' if checkbox is not checked

//   return checkboxValue;
// }

// // Main function to process the image and extract user input
// async function processImage(imagePath) {
//   try {
//     const extractedText = await extractText(imagePath);
//     const userInput = extractUserInput(extractedText);

//     console.log(`Output: ${userInput}`);
//   } catch (error) {
//     console.error('Error:', error.message || error);
//   }
// }

// // Replace 'path/to/your/image.jpg' with the actual path to your image
// // const imagePath = '/assets/image1.jpg';
// const inputImageRelativePath = 'assets/image1.jpg';

// // // Get the absolute path to the input image
// const imagePath = path.join(__dirname, inputImageRelativePath);

// // Call the main function
// processImage(imagePath);















// // // const Tesseract = require('tesseract.js');
// // // const sharp = require('sharp');
// // // const fs = require('fs');
// // // const path = require('path');

// // // // Function to extract text from an image using Tesseract OCR
// // // function extractTextFromImage(imagePath) {
// // //   return new Promise((resolve, reject) => {
// // //     Tesseract.recognize(
// // //       imagePath,
// // //       'eng', // Language code for English
// // //       {
// // //         logger: info => console.log(info), // Optional logger function
// // //       }
// // //     )
// // //       .then(({ data: { text } }) => {
// // //         resolve(text);
// // //       })
// // //       .catch(err => {
// // //         reject(err);
// // //       });
// // //   });
// // // }

// // // Function to process the image and extract desired information
// // async function processImage(imagePath) {
// //   try {
// //     // Resize image if needed
// //     const resizedImagePath = 'resizedImage.jpg';
// //     await sharp(imagePath).resize(1000).toFile(resizedImagePath);

// //     // Extract text using Tesseract OCR
// //     const extractedText = await extractTextFromImage(resizedImagePath);

// //     // Parse the extracted text to get key-value pairs
// //     const lines = extractedText.split('\n');
// //     const keyValuePairs = {};

// //     for (const line of lines) {
// //       // Add conditions based on the structure of your input images
// //       // For example, you might check for specific keywords or patterns
// //       if (line.includes('Checkbox:')) {
// //         const checkboxValue = line.replace('Checkbox:', '').trim();
// //         keyValuePairs['Checkbox'] = checkboxValue;
// //       } else if (line.includes('Text:')) {
// //         const textValue = line.replace('Text:', '').trim();
// //         keyValuePairs['Text'] = textValue;
// //       }
// //     }

// //     // Output the key-value pairs
// //     console.log('Output:', keyValuePairs);

//     // Clean up temporary files
// //     fs.unlinkSync(resizedImagePath);
// //   } catch (error) {
// //     console.error('Error:', error);
// //   }
// // }

// // // Specify the relative path to the input image in the "assets" folder
// // const inputImageRelativePath = 'assets/image1.jpg';

// // // Get the absolute path to the input image
// // const inputImagePath = path.join(__dirname, inputImageRelativePath);

// // // Process the image and extract information
// // processImage(inputImagePath);





// // const Tesseract = require('tesseract.js');
// // const fs = require('fs');
// // const path = require('path');

// // // Function to extract text from an image
// // async function extractTextFromImage(imagePath) {
// //   return new Promise((resolve, reject) => {
// //     Tesseract.recognize(
// //       imagePath,
// //       'eng', // Language: English
// //       {
// //         logger: (info) => {
// //           console.log(info); // Log progress (optional)
// //         },
// //       }
// //     ).then(({ data: { text } }) => {
// //       resolve(text.trim());
// //     }).catch((error) => {
// //       reject(error);
// //     });
// //   });
// // }

// // // Function to extract key-value pairs from the extracted text
// // function extractKeyValuePairs(text) {
// //   // Implement your logic to extract key-value pairs from the text
// //   // For simplicity, let's assume the text format is "key: value"
// //   const lines = text.split('\n');
// //   const keyValuePairs = {};

// //   lines.forEach((line) => {
// //     const [key, value] = line.split(':').map((item) => item.trim());
// //     if (key && value) {
// //       keyValuePairs[key] = value;
// //     }
// //   });

// //   return keyValuePairs;
// // }

// // // Main function to process the image and extract key-value pairs
// // async function processImage(imagePath) {
// //   try {
// //     // Extract text from the image
// //     const extractedText = await extractTextFromImage(imagePath);

// //     // Extract key-value pairs from the text
// //     const keyValuePairs = extractKeyValuePairs(extractedText);

// //     // Output the result
// //     console.log('Extracted Key-Value Pairs:', keyValuePairs);
// //   } catch (error) {
// //     console.error('Error processing image:', error);
// //   }
// // }
// // const inputImageRelativePath = 'assets/image1.jpg';

// // // Example usage: Replace 'example-image.png' with your image file path
// // const imagePath = path.join(__dirname, inputImageRelativePath);
// // // const imagePath = 'example-image.png';
// // processImage(imagePath);










// // const fs = require('fs');
// // const Tesseract = require('tesseract.js');
// // const sharp = require('sharp');

// // // Function to preprocess the image using sharp
// // async function preprocessImage(inputImagePath, outputImagePath) {
// //   await sharp(inputImagePath)
// //     .greyscale()  // Convert the image to grayscale
// //     .toFile(outputImagePath);
// // }

// // // Function to perform OCR using Tesseract
// // async function performOCR(imagePath) {
// //   return new Promise((resolve, reject) => {
// //     Tesseract.recognize(
// //       imagePath,
// //       'eng', // Specify the language (English in this case)
// //       {
// //         logger: (info) => {
// //           console.log(info); // Log Tesseract progress information
// //         },
// //       }
// //     )
// //       .then(({ data: { text } }) => {
// //         resolve(text);
// //       })
// //       .catch((error) => {
// //         reject(error);
// //       });
// //   });
// // }

// // // Function to extract selective text and the value of checked box
// // function extractData(ocrText) {
// //   // Extracting selective text and checkbox value logic goes here
// //   // Modify this function according to the specific format of your images
  
// //   // Example: extracting lines of text
// //   const lines = ocrText.split('\n');
  
// //   // Example: extracting checked boxes
// //   const checkedBoxes = lines.filter(line => line.includes('☑'));

// //   return { lines, checkedBoxes };
// // }

// // // Main function to process images
// // async function processImages() {
// //   const inputImages = ['image1.jpg', 'image2.jpg']; // Replace with your image filenames

// //   for (const inputImage of inputImages) {
// //     const outputPath = `processed_${inputImage}`;

// //     // Preprocess the image
// //     await preprocessImage(inputImage, outputPath);

// //     // Perform OCR on the preprocessed image
// //     const ocrText = await performOCR(outputPath);

// //     // Extract selective data from the OCR result
// //     const extractedData = extractData(ocrText);

// //     // Output the results
// //     console.log(`Results for ${inputImage}:`);
// //     console.log('Lines of text:', extractedData.lines);
// //     console.log('Checked boxes:', extractedData.checkedBoxes);
// //     console.log('\n');
// //   }
// // }

// // // Execute the main processing function
// // processImages();
