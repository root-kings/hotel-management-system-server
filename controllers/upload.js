const formidable = require('formidable')
const aws = require('aws-sdk')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const S3_BUCKET = process.env.S3_BUCKET
aws.config.region = process.env.AWS_REGION

const s3 = new aws.S3()

exports.file_post = (req, res) => {
  const form = formidable({ multiples: true })
  const fileExtRE = /(?:\.([^.]+))?$/

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err)
      return res.status(500).send(err)
    }
    // console.log(files)
    if (!Array.isArray(files.image)) files.image = [files.image]

    // console.log(files.image)
    let file = files.image[0]

    let awsName = uuidv4() + '.' + fileExtRE.exec(file.name)[1]
    let awsFilePath = `root-hms/hotels/${awsName}`
    let awsPath = `https://${S3_BUCKET}.s3.amazonaws.com/${awsFilePath}`

    var params = {
      Body: fs.readFileSync(file.path),
      Bucket: S3_BUCKET,
      Key: awsFilePath,
      ACL: 'public-read'
    }

    await s3
      .putObject(params)
      .promise()
      .then(
        function (data) {
          res.send({ imageURL: awsPath })
        },
        function (error) {
          console.error(error)
          res.status(500).send(error)
        }
      )
  })
}
