# 고객 이탈 예측 및 CLTV 분석
### Customer Churn Prediction & CLTV Analysis

## 프로젝트 소개

IBM Telco Customer Churn 데이터를 이용해 고객 이탈 패턴을 살펴보고, 이탈 가능성이 높은 고객 중에서도 우선적으로 관리할 고객을 찾는 프로젝트입니다.

처음에는 단순히 이탈 여부를 예측하는 데서 시작했지만, 실제로는 모든 이탈 가능 고객을 똑같이 관리할 수 없기 때문에 **이탈 확률과 고객가치(CLTV)를 같이 보는 방식**으로 확장했습니다.

---

## 데이터

- IBM Telco Customer Churn Dataset
- 고객 수: **7,043명**
- 변수 수: **33개**
- 이탈 고객: **1,869명**
- 이탈률: **26.54%**
- Target: `Churn Value` (`0` = 유지, `1` = 이탈)
- 고객가치: `CLTV`

데이터를 처음 확인했을 때 `Total Charges`가 숫자형이 아니라 `object`로 되어 있었고, 숫자로 바로 변환되지 않는 값이 11개 있었습니다. 해당 값을 확인한 뒤 숫자형으로 정리했습니다.

또 `Churn Label`, `Churn Score`, `Churn Reason`은 실제 이탈 결과를 알고 난 뒤 만들어지는 정보이기 때문에 예측 모델에서는 제외했습니다.

---

## 분석 과정

### 1. 데이터 정리

- 데이터 타입과 결측치 확인
- `Total Charges` 숫자형 변환
- 이탈 결과가 직접 포함된 변수 제외

### 2. EDA

다음 질문을 중심으로 이탈 패턴을 확인했습니다.

- 계약 유형에 따라 이탈률이 다른가?
- 가입기간이 짧은 고객이 더 많이 이탈하는가?
- 이탈 고객과 유지 고객의 월 요금에 차이가 있는가?
- 인터넷 서비스나 결제 방식에 따라 이탈률이 다른가?
- 실제 이탈 고객이 많이 선택한 이탈 이유는 무엇인가?

### 3. 통계 검정

그래프에서 보이는 차이가 통계적으로도 의미가 있는지 확인하기 위해 아래 검정을 사용했습니다.

- **Chi-square Test**: 계약 유형과 이탈 여부의 연관성
- **Welch’s t-test**: 이탈/유지 고객의 Monthly Charges, Tenure 평균 차이

### 4. 이탈 예측

- Baseline
- Logistic Regression
- Random Forest

유지 고객이 전체의 73.46%이기 때문에 Accuracy만으로 모델을 판단하지 않고 Precision, Recall, F1-score, ROC-AUC를 같이 봅니다.

### 5. 우선 관리 고객 찾기

모델에서 계산한 이탈 확률과 CLTV를 결합해 고객을 네 그룹으로 나눴습니다.

| 고객군 | 의미 |
|---|---|
| **High Risk / High Value** | 이탈 가능성도 높고 고객가치도 높음 → 최우선 관리 |
| **High Risk / Low Value** | 이탈 가능성은 높지만 고객가치는 상대적으로 낮음 |
| **Low Risk / High Value** | 이탈 위험은 낮지만 가치가 높은 우량 고객 |
| **Low Risk / Low Value** | 상대적으로 관리 우선순위가 낮은 고객 |

---

## 지금까지 확인한 내용

전체 7,043명 중 1,869명이 이탈해 이탈률은 약 26.5%였습니다.

모델을 만들 때는 성능 수치를 높이는 것보다 실제 예측 시점에 사용할 수 있는 정보만 넣는 것을 우선했습니다. 그래서 이탈 결과를 직접 알려주는 변수는 제외했고, CLTV도 이탈 예측 변수로 바로 넣지 않고 예측이 끝난 뒤 고객 우선순위를 정하는 데 사용했습니다.

제가 이 프로젝트에서 가장 보고 싶었던 건 단순히 **누가 이탈할까?**가 아니라,

> **이탈할 가능성이 있는 고객을 찾았다면, 그중 누구를 먼저 관리해야 할까?**

였습니다.

---

## 사용 기술

`Python` · `Pandas` · `NumPy` · `Matplotlib` · `SciPy` · `scikit-learn` · `Statistics` · `Machine Learning` · `Business Analytics`

---

## Next Steps

- Logistic Regression / Random Forest 성능 비교
- Confusion Matrix, ROC Curve 확인
- 주요 이탈 요인 정리
- High Risk / High Value 고객군 추출
- 최종 모델 결과와 그래프 업데이트
