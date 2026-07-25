<template>
  <section id="notice" class="bg-white py-20 px-6">
    <div class="max-w-4xl mx-auto">

      <!-- 제목 -->
      <p class="text-xs font-bold tracking-widest mb-2" style="color: #9B7B4B;">SHOP NOTICE</p>
      <h2 class="text-4xl font-black mb-3" style="color: #3D2B1F;">가발 제작 공지</h2>
      <div class="w-10 h-1 rounded-full mb-10" style="background-color: #E8A020;"></div>

      <!-- 상단 2단 카드 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        <!-- 가발 제작 기간 -->
        <div class="rounded-2xl p-6" style="background-color: #FEFCE8;">
          <p class="font-black text-lg mb-5" style="color: #3D2B1F;">⏰ 가발 제작 기간</p>
          <div class="space-y-3 text-sm" style="color: #4B3B2B;">
            <div class="flex gap-4">
              <span class="font-bold whitespace-nowrap">14일 이상</span>
              <span>기본 세팅비 + 택배비</span>
            </div>
            <div class="flex gap-3 items-center">
              <span class="rounded-full px-3 py-1 text-xs font-bold text-white whitespace-nowrap" style="background-color: #E8906A;">7 ~ 13일</span>
              <span>기본 세팅비 + 택배비 + <strong>긴급 세팅비</strong> 별도 부과</span>
            </div>
            <div class="flex gap-3 items-center">
              <span class="rounded-full px-3 py-1 text-xs font-bold text-white whitespace-nowrap" style="background-color: #E8706A;">3 ~ 6일</span>
              <span>초긴급 — 개별 문의 필요</span>
            </div>
          </div>
        </div>

        <!-- 주문 방법 -->
        <div class="rounded-2xl p-6" style="background-color: #FEFCE8;">
          <p class="font-black text-lg mb-5" style="color: #3D2B1F;">📋 주문 방법</p>
          <ol class="space-y-3 text-sm" style="color: #4B3B2B;">
            <li class="flex gap-3">
              <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0" style="background-color: #E8C040;">1</span>
              <span>캐릭터 앞·뒤·옆 3장 이상의 사진 + 장르명·캐릭터명 + 수령 날짜 전송</span>
            </li>
            <li class="flex gap-3">
              <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0" style="background-color: #E8C040;">2</span>
              <span>견적 및 가격 확인 후 선입금</span>
            </li>
            <li class="flex gap-3">
              <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0" style="background-color: #E8C040;">3</span>
              <span>성함·연락처·배송지 주소 전달</span>
            </li>
            <li class="flex gap-3">
              <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0" style="background-color: #E8C040;">4</span>
              <span>삽주가 가발 수령 후 제작 시작 별도 안내</span>
            </li>
            <li class="flex gap-3">
              <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0" style="background-color: #E8C040;">5</span>
              <span>완성본 사진 컨펌 진행</span>
            </li>
            <li class="flex gap-3">
              <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0" style="background-color: #E8C040;">6</span>
              <span>CJ대한통운으로 발송 + 운송장 번호 안내</span>
            </li>
          </ol>
        </div>
      </div>

      <!-- 견적 문의 전 필독사항 -->
      <div class="rounded-2xl p-6" style="background-color: #FEFCE8;">
        <p class="font-black text-lg mb-5" style="color: #3D2B1F;">📌 견적 문의 전 필독사항</p>
        <ul class="space-y-3 text-sm" style="color: #4B3B2B;">
          <li class="flex gap-2"><span style="color: #E8A020;">✦</span><span>가발은 <strong>신품 상태의 가발만</strong> 취급합니다.</span></li>
          <li class="flex gap-2"><span style="color: #E8A020;">✦</span><span>기간이 넉넉한 경우 가발의 신품 구매를 도와드릴 수 있습니다! (캐릭터 가발 및 기본 가발)</span></li>
          <li class="flex gap-2"><span style="color: #E8A020;">✦</span><span>직접 갖고 계신 가발이 있으신 경우 확인을 위해 <strong>반드시 사진 첨부</strong>가 필요합니다.</span></li>
          <li class="flex gap-2"><span style="color: #E8A020;">✦</span><span>캐릭터 사진은 앞·뒤·옆 <strong>3장 이상</strong> 필요하며, <strong>반드시 전체 머리가 다 보이는 사진</strong>을 보내주세요.</span></li>
          <li class="flex gap-2"><span style="color: #E8A020;">✦</span><span>삽주는 원작과 동일하게 제작하기 때문에 원하시는 느낌이 있다면 꼭 말씀해 주세요!</span></li>
          <li class="flex gap-2"><span style="color: #E8A020;">✦</span><span>수령 기한은 반드시 <strong>3일 정도의 여유</strong>를 남겨서 신청해주세요!</span></li>
          <li class="flex gap-2"><span style="color: #E8A020;">✦</span><span>요구 사항은 <strong>제작이 들어가기 전에</strong> 말씀해주셔야 합니다.</span></li>
          <li class="flex gap-2"><span style="color: #E8A020;">✦</span><span>택배 배송 후 혼동이 생기지 않게 <strong>운송장 번호를 꼭 보관</strong>해 주세요.</span></li>
        </ul>
        <div class="mt-6 pt-4 border-t text-sm" style="border-color: #E8D080; color: #4B3B2B;">
          🧡 배송 시 넉넉한 비닐에 담아 보내드리나, 가발 수령 즉시 <strong>걸어서 보관</strong>해 주세요. 배송 기간 동안 약간의 눌림이 있을 수 있으니 참고 바랍니다.
        </div>
      </div>

    </div>
  </section>
</template>