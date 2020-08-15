# Givven API server
블록체인 기부 플랫폼

## 협업 규칙 
#### Task
asana task 와 PR을 1:1 대응시키기 
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
3. PR 이름은 **asana** task 이름과 같게
4. 변경 사항 / 특이사항/ asana task link 를 Description에 작성
5. Reviewer 설정 / asana에서 mention 하여  리뷰요청

* 전원 리뷰 완료시 `merge`
* 이해가 안되는 코드는 변경사항을 보고 플젝에 어떤 영향을 미칠지 생각하여 리뷰 남기기
* 도움 요청은 Draft PR 로 올리기


****
