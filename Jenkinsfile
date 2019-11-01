pipeline {
    
    agent any

    tools {
      nodejs "NodeJs"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Example') {
          steps {
            sh 'npm config ls'
          }
        }

        // stage('Install') {
        //     steps {
        //       sh 'node -v'
        //       sh 'npm install'
        //     }
        // }

        // stage('Testing') {
        //   steps {
        //     sh 'npm prune'
        //     sh 'npm test'
        //   }
        // }

    }
}

