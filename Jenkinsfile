pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'healthcare-app'
        DOCKER_TAG = 'latest'
        DOCKER_REGISTRY = 'your-docker-registry-url'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ali2307/Containerized-Web-Application-with-NGINX-and-Node.js.git'
            }
        }
        
        stage('Install Dependencies') {
            agent {
                docker {
                    image 'node:16'
                }
            }
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
            }
        }

        stage('Push to Docker Registry') {
            steps {
                sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}"
                sh "docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}"
            }
        }

        stage('Deploy') {
            steps {
                sh "docker run -d -p 8080:8080 --name healthcare-container ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}"
            }
        }
    }

    post {
        always {
            echo 'Pipeline complete!'
        }
    }
}
