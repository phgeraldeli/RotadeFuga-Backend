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

        stage('Config') {
          steps {
            sh 'npm config ls'
            sh 'npm install -g yarn'
          }
        }

        stage('Install') {
            steps {
              sh 'yarn install'
            }
        }

        stage('Testing') {
          steps {
            sh 'yarn prune'
            sh 'yarn test'
          }
        }

    }
}

