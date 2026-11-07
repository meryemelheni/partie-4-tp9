pipeline {
  agent any

  options {
    disableConcurrentBuilds()
    timestamps()
  }

  environment {
    IMAGE_NAME = "maryemelheni/contact-api"
  }

  stages {
    stage('Checkout') {
      steps {
        script {
          env.SHORT_SHA = env.GIT_COMMIT.take(7)
          echo "Git SHA court : ${env.SHORT_SHA}"
        }
      }
    }

    stage('Install') {
      agent {
        docker { image 'node:24-alpine'; reuseNode true }
      }
            steps {
        dir('tp9') {
          sh 'npm install'
        }
      }
    }

    stage('Quality') {
      parallel {
        stage('Lint') {
          agent {
            docker { image 'node:24-alpine'; reuseNode true }
          }
                    steps {
            dir('tp9') {
              sh 'npm pkg set scripts.lint="eslint ." && npm run lint || true'
            }
          }
        }
        stage('Unit tests') {
          agent {
            docker { image 'node:24-alpine'; reuseNode true }
          }
                    steps {
            dir('tp9') {
              sh 'npx vitest run --reporter=default --reporter=junit --outputFile.junit=reports/junit.xml'
            }
          }
        }
      }
    }

    stage('Build') {
            steps {
        dir('tp9') {
          sh 'docker build -t ${IMAGE_NAME}:${SHORT_SHA} --label org.opencontainers.image.revision=${GIT_COMMIT} .'
        }
      }
    }

            stage('Push') {
      when {
        expression {
          return env.BRANCH_NAME == 'main' || env.GIT_BRANCH == 'origin/main'
        }
      }
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DH_USER', passwordVariable: 'DH_TOKEN')]) {
          sh 'echo "$DH_TOKEN" | docker login -u "$DH_USER" --password-stdin'
          sh 'docker push "$IMAGE_NAME:$SHORT_SHA"'
        }
      }
    }
  }

  post {
    always {
        junit testResults: 'reports/junit.xml', allowEmptyResults: true
    }
    success {
      sh 'echo "${IMAGE_NAME}:${SHORT_SHA}" > image.txt'
      archiveArtifacts artifacts: 'image.txt', fingerprint: true
    }
    failure {
      echo 'Le pipeline a échoué.'
    }
    cleanup {
      cleanWs()
    }
  }
}
