Skip to content
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@phgeraldeli 
365
3.1k1.9kjenkinsci/pipeline-examples
 Code Pull requests 15 Actions Projects 0 Security Insights
pipeline-examples/jenkinsfile-examples/nodejs-build-test-deploy-docker-notify/Jenkinsfile
@sharepointoscar sharepointoscar stages now use block arguments as per new requirements.
68da48f on 10 Apr 2017
@MikeCaspar@sharepointoscar@patoi@ArtikUA@andrask
97 lines (64 sloc)  2.43 KB
  
#!groovy

/*
The MIT License
Copyright (c) 2015-, CloudBees, Inc., and a number of other of contributors
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

node('node') {


    currentBuild.result = "SUCCESS"

    try {

       stage('Checkout'){
          checkout scm
       }

       stage('Install') {
         sh 'node -v'
         sh 'npm install'
       }

       stage('Test'){

         env.NODE_ENV = "test"

         print "Environment will be : ${env.NODE_ENV}"

         sh 'npm prune'
         sh 'npm test'

       }


    }

}

