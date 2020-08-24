# Givven API Server

# usage

http://ec2-54-180-160-14.ap-northeast-2.compute.amazonaws.com:8080

# index

1. 인증
   1. [login](#login)
   2. [join](#join)
   3. [logout](#logout)
2. 캠페인
   1. [캠페인 등록](#캠페인-등록)
   2. [내 캠페인](#내-캠페인)
   3. [캠페인 상세](#캠페인-상세)
3. 이미지
   1. [image](#image)
4. 상품
   1. [상품 등록](#상품-등록)
   2. [상품 상세](#상품-상세)
   3. [내 상품](#내-상품)
   4. [전체 상품](#전체-상품)
5. 주문/거래 내역
   1. [내 주문 내역](#내-주문-내역)
   2. [주문 내역 상세](#주문-내역-상세)
   3. [내 기부 내역](#내-기부-내역)
   4. [캠페인 주문 내역](#캠페인-주문-내역)
   5. [캠페인 기부 내역](#캠페인-기부-내역)
6. 포인트
   1. [포인트 구매](#포인트-구매)
   2. [포인트 환전](#포인트-환전)
7. 거래
   1. [기부](#기부)
   2. [상품 구매](#상품-구매)

# API List

## 1. 인증

### login

<hr />

`POST /auth/login`

| Param    | type   | desc             |
| -------- | ------ | ---------------- |
| email    | string | 유저 계정 이메일 |
| password | string | 비밀번호         |

response

| Param   | success         | fail      |
| ------- | --------------- | --------- |
| message | 성공 메시지     | 실패 이유 |
| user    | user email/type | `null`    |

<hr />

### join

`POST /auth/join`

| Param    | type   | desc                      |
| -------- | ------ | ------------------------- |
| name     | string | 유저 이름                 |
| email    | string | 유저 계정 이메일          |
| password | string | 비밀번호                  |
| type     | string | normaml /seller / charity |

response

| Param   | success     | fail      |
| ------- | ----------- | --------- |
| message | 성공 메시지 | 실패 이유 |

<hr />

### logout

`GET auth/logout`

## 2. 캠페인

<hr />

### 캠페인 등록

`POST campaign/register`

| Param      | type      | desc                    |
| ---------- | --------- | ----------------------- |
| name       | string    | 캠페인 이름             |
| dest_money | integer   | 모금 목표 금액          |
| content    | string    | 캠페인 내용             |
| due_day    | timestamp | 기부 마감일             |
| title_img  | string    | img를 동록하고 받은 url |

<hr />

### 내 캠페인

`GET campaign/myCampaigns/:status`

| status | desc   |
| ------ | ------ |
| end    | 완료된 |
| ing    | 진행중 |

<hr />

### 캠페인 상세

`GET /campaign/detail/:id`

<hr />

## 3. 이미지

### image

`POST /img`

| Param | type | desc        |
| ----- | ---- | ----------- |
| img   | file | 이미지 파일 |

Response

```
{
   url : "uploads/filename"
}
```

<hr />

## 4. 상품

### 상품 등록

`POST /item/register`

| Param     | type    | desc                    |
| --------- | ------- | ----------------------- |
| name      | string  | 상품 이름               |
| content   | string  | 상품 설명               |
| price     | integer | 가격                    |
| stock     | integer | 재고                    |
| title_img | string  | img를 동록하고 받은 url |

<hr />

### 상품 상세

`GET /item/:id`

<hr />

### 내 상품

`GET /item/myItems`

<hr />

### 전체 상품

`GET /item/items`

<hr />

## 5. 주문/거래 내역

### 내 주문 내역

`GET /tradLog/myOrders`

<hr />

### 주문 내역 상세

`GET /tradeLog/orderDetail/:id`

<hr />

### 내 기부 내역

`/tradeLog/myDonations/:status`

| status | desc          |
| ------ | ------------- |
| end    | 완료 캠페인   |
| ing    | 진행중 캠페인 |

<hr />

### 캠페인 주문 내역

`GET /tradeLog/ordersByCampaign`

<hr />

### 캠페인 기부 내역

`GET /tradeLog/donationsByCampaign/:id`

## 6. 포인트

### 포인트 구매

`POST /point/buy`

| Param | type    | desc      |
| ----- | ------- | --------- |
| value | integer | 충전 금액 |

<hr />

### 포인트 환전

`POST /point/change`

| Param | type    | desc      |
| ----- | ------- | --------- |
| value | integer | 환전 금액 |

## 7. 거래

### 기부

`POST /campaign/donate`

| Param      | type    | desc               |
| ---------- | ------- | ------------------ |
| campaignId | integer | 기부할 캠페인의 id |
| value      | integer | 기부 할 금액       |

<hr />

### 상품 구매

`POST /item/buy`

| Param      | type    | desc                      |
| ---------- | ------- | ------------------------- |
| itemId     | integer | 구매할 상품의 id          |
| orderCount | integer | 주문 량                   |
| campaignId | integer | 모금액을 차감할 캠페인 id |
| addr       | string  | 배송지                    |
