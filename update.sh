#!/bin/bash

# GitHub 仓库和工作流信息
REPO_OWNER="Funny-ppt"
REPO_NAME="InfrastSim"
WORKFLOW_NAME="dotnet.yml"
ARTIFACT_NAME="AppBundle"

# 获取最新工作流的运行号
LATEST_RUN=$(curl -s "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/workflows/$WORKFLOW_NAME/runs" | jq -r '.workflow_runs[0].id')

# 检查是否需要下载 Artifact
RUNID_FILE="tmp/last_run_id"
if [ -f "$RUNID_FILE" ]; then
  LAST_RUNID=$(cat "$RUNID_FILE")
else
  LAST_RUNID=""
fi

if [ "$LAST_RUNID" != "$LATEST_RUN" ]; then
  # 下载 Artifact
  echo "Downloading $ARTIFACT_NAME..."
  if [ ! -d "tmp" ]; then
    mkdir tmp
  else
    rm -r tmp/*
    rm tmp/.stamp
  fi
  gh run download "$LATEST_RUN" -R "$REPO_OWNER/$REPO_NAME" -n "$ARTIFACT_NAME" -D tmp
  # 为 dotnet.runtime.js 中的 import 添加 /* @vite-ignore */
  sed -i 's|import(\([^)]*\))|import(/* @vite-ignore */ \1)|g' tmp/_framework/dotnet.runtime.js
  rm -r src/wasm
  cp -r tmp/_framework/* public/assets/
  cp -r tmp/_framework src/wasm

  # 保存最新的运行号到文件中
  echo "$LATEST_RUN" > "$RUNID_FILE"
  echo "Downloaded and updated to the latest run ID: $LATEST_RUN"
else
  echo "Artifact is already up to date with the latest run ID: $LATEST_RUN"
fi