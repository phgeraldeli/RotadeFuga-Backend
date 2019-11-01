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

