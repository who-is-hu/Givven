# Givven
블록체인 기부 플랫폼

## How to use
http://ec2-18-191-88-208.us-east-2.compute.amazonaws.com:8080

## 협업 규칙 
#### issue
할당 받은 업무는 모두 issue로 등록 
PR 과 1:1 대응시키기
****

#### branch
    feat/<issue#>-branchName
    fix/<issue#>-branchName
****

#### Commit
* 작업 단위로 `commit` 하기 ( 너무 작은 작업들은 `squash` )
* 생각없이 `git add . ` 하지말고 커밋내용에 알맞는 작업만 추가하기
<br/>
#### message
    // 기능 추가 등의 커밋  
    feat: message
    // 수정 사항 
    fix: message
    // 삭제
    remove: message

****
#### Pull Request
1. master를 `pull` 하여 업데이트
2. `merge` 할 브랜치를 master 에 `rebase` 
    - confilct 를 미리 해결하고 로그를 깔끔하게 유지 하기 위함
3. Reviewer 설정
4. 변경 사항 / 특이사항 Description에 작성
5. <b>PR description 에 `close #issue-number` 추가하기!</b> 

* 전원 리뷰 완료시 `merge`
* 이해가 안되는 코드는 변경사항을 보고 플젝에 어떤 영향을 미칠지 생각하여 리뷰 남기기
* 도움 요청은 Draft PR 로 올리기


****

#### 마무리 말

쉬엄쉬엄 꾸준히하면서 소공전 수상하고
졸업 요건도 채우고
Git 사용법도 배웁시다. 빠이팅~
